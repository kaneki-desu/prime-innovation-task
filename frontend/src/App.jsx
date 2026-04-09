import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const ws = useRef(null);

  // 🔹 Fetch all posts initially
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔹 Setup WebSocket
  useEffect(() => {
    ws.current = new WebSocket(`${import.meta.env.VITE_WS_URL}}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPosts(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => ws.current.close();
  }, []);

  // 🔹 Handle Search (with debounce)
  let timeout = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (ws.current && ws.current.readyState === 1) {
        ws.current.send(value);
      }
    }, 300);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearch}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          
          <img 
            src={post.image} 
            alt="post"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />

          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
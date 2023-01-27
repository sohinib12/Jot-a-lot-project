import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-welcome-title"> welcome user</div>
      <div className="home-parent">
        <div className="home-notes-list">notes list</div>
        <div className="home-scratchpad">scratch pad</div>
      </div>
    </div>
  );
}

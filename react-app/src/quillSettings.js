const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
    ["code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
  ],
};

export default modules;

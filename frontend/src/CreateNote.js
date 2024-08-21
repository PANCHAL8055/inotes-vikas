import { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./CreateNote.css";

Quill.register("modules/imageResize", ImageResize);

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", title: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(html);
  }

  handleSave = async () => {
    const note = { title: this.state.title, content: this.state.editorHtml };
    try {
      console.log(note);
      await fetch("http://localhost:8002/api/v1/note/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(note),
      }).then((response) => {
        if (response.ok) {
          console.log("Note saved successfully");
          alert("Note saved successfully");
          window.location.href = "/";
        } else {
          console.error("Error saving the note:", response.statusText);
          alert("Error saving the note.");
        }
      });
    } catch (error) {
      console.error("Error saving the note:", error);
      alert("Error saving the note.");
    }
  };

  render() {
    return (
      <div className={localStorage.getItem('theme')==="dark"?"dark":""}>
      <div  className={`create-note-container ${localStorage.getItem('theme')==="dark"?"text-color-white backgorund-color-grey":""}`}>
        <div className="create-note-header">
          <h1 className={` ${localStorage.getItem('theme')==="dark"?"text-color-white ":""}`}>Create Note</h1>
          <div className="button-container">
            {/* Cancel button */}
            <button
              className="cancel-button"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Cancel
            </button>
            <button className="save-button" onClick={() => this.handleSave()}>
              Save
            </button>
          </div>
        </div>
        <div className="form-group">
          <div htmlFor="title"  className={ `titl ${localStorage.getItem('theme')==="dark"?"text-color-white":""}` } >Title</div>
          <input
            type="text"
            className={`form-control ${localStorage.getItem('theme')==="dark"?"text-color-white backgorund-color-grey":""}`}
            id="title"
            placeholder="Enter title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>

        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={CreateNote.modules}
          formats={CreateNote.formats}
          bounds={"#root"}
          placeholder={this.props.placeholder}
        />
      </div>
      </div>
    );
  }
}

CreateNote.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};


CreateNote.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default CreateNote;

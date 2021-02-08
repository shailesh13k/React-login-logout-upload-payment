import React, { Component } from "react";
import "../App.css";
import BackendServices from "../services/BackendServices";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.downloadFile = this.downloadFile.bind(this);

    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      fileInfos: [],
    };
  }

  componentDidMount() {
    BackendServices.getUserFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFiles(event) {
    this.setState({
      progressInfos: [],
      selectedFiles: event.target.files,
    });
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];

    BackendServices.postUserFiles(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      this.setState({
        _progressInfos,
      });
    })
      .then((response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });

        return BackendServices.getUserFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  uploadFiles() {
    const selectedFiles = this.state.selectedFiles;
    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }
    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  }
  downloadFile(fileurl, fileName) {
    BackendServices.downloadFile(fileurl, fileName);
  }

  render() {
    const { selectedFiles, progressInfos, message, fileInfos } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-10">
            <label className="btn btn-default p-0">
              <input
                className="form-control form-control-lg"
                type="file"
                multiple
                onChange={this.selectFiles}
              />
            </label>
          </div>
          <div className="col-2">
            <button
              className="btn btn-success  btn-lg"
              disabled={!selectedFiles}
              onClick={this.uploadFiles}
            >
              Upload
            </button>
          </div>
          <div className="col-12 mt-3">
            {message.length > 0 && (
              <div className="alert alert-primary" role="alert">
                <ul>
                  {message.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </div>
            )}
            {progressInfos &&
              progressInfos.map((progressInfo, index) => (
                <div className="mb-3" key={index}>
                  <span>{progressInfo.fileName}</span>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      aria-valuenow={progressInfo.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: progressInfo.percentage + "%" }}
                    >
                      {progressInfo.percentage}%
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <ul className="list-group">
              <li class="list-group-item active" aria-current="true">
                List of Files
              </li>
              {fileInfos &&
                fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    {file.actualFileName}
                    <button
                      class="btn btn-info btn-sm float-end"
                      onClick={() => {
                        this.downloadFile(file.url, file.actualFileName);
                      }}
                      targe="_blank"
                    >
                      Download
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

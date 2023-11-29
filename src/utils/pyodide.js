import { loadPyodide } from "pyodide";

let instance = null;
let micropip = null;

const getPythonInterpretor = () => {
  if (!instance) {
    instance = new PythonInterpretor();
  }
  return instance;
};

export { getPythonInterpretor };

export class PythonInterpretor {
  constructor() {
    this.pyodide = null;
    this.output = console.log;
    this.results = "";
    this.ready = loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full",
      stderr: (text) => {
        this.output(text);
      },
      stdout: (text) => {
        this.output(text);
      },
    }).then((pyodide) => {
      this.pyodide = pyodide;
      this.pyodide.loadPackage("micropip").then(() => {
        micropip = this.pyodide.pyimport("micropip");
        console.log(
          this.pyodide.runPython(`
                        import sys
                        sys.version
                    `)
        );
        this.pyodide.runPython('print("Hello from Python!")');
      });
    });
  }
  setOutput(output) {
    this.output = (text) => {
      output(text);
      if (this.results !== "") this.results = this.results + "\n";
      this.results = this.results + text;
    };
  }
  async installPackage(packageName) {
    if (!micropip) {
      throw new Error("Micropip is not initialized yet.");
    }
    try {
      return await micropip.install(packageName);
    } catch (e) {
      console.log(e);
      if (this.results !== "") this.results = this.results + "\n";
      this.results = this.results + e.message;
      const res = e.message;
      return res;
    }
  }
  run(code) {
    if (!this.pyodide) {
      throw new Error("Pyodide is not initialized yet.");
    }

    this.pyodide.runPython(code);
    const res = this.results;
    this.results = "";
    return res;
  }
}

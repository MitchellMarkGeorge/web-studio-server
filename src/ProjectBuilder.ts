import fs from "fs-extra";
import dedent from "ts-dedent";
import path from "path";

interface BuildOptions {
  projectId: string;
  js: string;
  css: string;
  html: string;
}

export class ProjectBuilder {
  public async buildProject(options: BuildOptions) {
    // TODO: transpile langs, format code
    const { projectId, js, css, html } = options
    const htmlDocument = this.buildHTMLDocument(js, css, html);
    await this.writeHTMLDocument(projectId, htmlDocument);
  }

  private async writeHTMLDocument(projectId: string, html: string) {
    const projectFilePath = this.getProjectFilePath(projectId);
    await fs.outputFile(projectFilePath, html, "utf-8");
} 

  public getProjectFilePath(projectId: string) {
    return path.resolve(__dirname, "project_files", `${projectId}.html`);
  }

  private buildHTMLDocument(js: string, css: string, html: string) {
    return dedent`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Web Studio Project Preview</title>
                <style>
                    ${css}
                </style>
            </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
        </html> 
        `;
  }
}

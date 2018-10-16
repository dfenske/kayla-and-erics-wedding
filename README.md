# Kayla and Eric's Wedding Website

## Requirements
* NPM and Node
* Visual Studio

## Getting Started
* Open a command line
* Navigate to /ClientApp
* Run `npm install`
* Open the solution in Visual Studio
* Restore the NuGet packages
* Build the solution 
* Run the solution
  * This runs both the dotnet project AND the front-end react code. 
* It will open a browser to https://localhost:5001/

## Project Structure
* This project was created using the `dotnet new react` command. 
* The front-end code lives in /ClientApp
* The npm packages are configured in `/ClientApp/package.json`
* The react app is *not* ejected. This means it is less configurable, but just works. This means we can't use SCSS.
* The backend code lives at the root of the project, which is an MVC app. 
import { expect, test } from "@jest/globals";
import githubController from "../../controller/github.controllers";
const git = new githubController("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")

// Create Repo test
/*const testForgithubController=async ()=>{
    const response = await git.createRepository("TestRepo","A repo created for testing purpose.")
    console.log(response)
}*/

// Create Repo test
const testForgithubController=async ()=>{
    const response = await git.archiveRepository("AdheeshVerma","https://github.com/AdheeshVerma/TestRepo")
    console.log(response)
}
testForgithubController().then((res)=>{
    console.log(res)
});
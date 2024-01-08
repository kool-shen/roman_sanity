import { defineConfig } from "sanity";
import      {deskTool} from "sanity/desk"
import schemas from "./sanity/schemas"
import { visionTool } from "@sanity/vision";
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'




const config = defineConfig(    {

    projectId: "h6makjy9",
    dataset: "production",
    title: "roman sanity 2",
    apiVersion: "2023-03-03",
    basePath: "/admin",
    useCdn : true,
    plugins: [deskTool(), visionTool(), media(), muxInput()],
    schema:   {types: schemas}

})

export default config
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Document Schemas
import page from "./documents/page";
import author from "./documents/author";
import post from "./documents/post";
import store from "./documents/store";
import product from "./documents/product";
import user from "./documents/user";

import blockContent from "./blockContent";

// Object Components
import hero from "./objects/components/hero";
import textBlock from "./objects/components/textBlock";
import textImageBlock from "./objects/components/textImageBlock";
import carousel from "./objects/components/carousel";
import button from "./objects/components/button";
import customComponent from "./objects/components/customComponent";

// Object Configs/Pages
import siteSettings from "./objects/siteSettings";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    blockContent,
    //
    page,
    // author,
    // post,
    post,
    store,
    // product,
    // user,
    //
    hero,
    textBlock,
    textImageBlock,
    carousel,
    button,
    customComponent,
    //
    siteSettings
  ])
});

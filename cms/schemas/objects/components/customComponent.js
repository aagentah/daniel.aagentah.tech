import MDTextFields from "react-icons/lib/md/text-fields";

export default {
  name: "customComponent",
  type: "document",
  title: "Custom Component",
  icon: MDTextFields,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      required: true
    },
    {
      name: "slug",
      title: "Slug",
      description: "For example: gridPosts",
      type: "string",
      required: true
    },
    // {
    //   name: "padding",
    //   title: "Padding",
    //   description: "Spacing inside the component. Number between 0-7",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "0", value: "0" },
    //       { title: "1", value: "1" },
    //       { title: "2", value: "2" },
    //       { title: "3", value: "3" },
    //       { title: "4", value: "4" },
    //       { title: "5", value: "5" },
    //       { title: "6", value: "6" },
    //       { title: "7", value: "7" },
    //     ],
    //   },
    //   required: true,
    // },
    {
      name: "marginTop",
      title: "Margin Top",
      description: "Spacing outside the component. Number between 0-7",
      type: "string",
      options: {
        list: [
          { title: "0", value: "0" },
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "7", value: "7" }
        ]
      },
      required: true
    },
    {
      name: "marginBottom",
      title: "Margin Bottom",
      description: "Spacing outside the component. Number between 0-7",
      type: "string",
      options: {
        list: [
          { title: "0", value: "0" },
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "7", value: "7" }
        ]
      },
      required: true
    },
    {
      name: "modifier",
      title: "Modifier",
      description: "Used for things such as CSS modifiers",
      type: "string"
    }
  ]
};

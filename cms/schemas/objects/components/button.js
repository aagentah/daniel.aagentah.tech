import MDTextFields from "react-icons/lib/md/text-fields";

export default {
  name: "button",
  type: "document",
  title: "Button",
  icon: MDTextFields,
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
      required: true
    },
    {
      name: "href",
      title: "URL",
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
    //       { title: "7", value: "7" }
    //     ]
    //   },
    //   required: true
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
  ],
  preview: {
    select: {
      text: "text"
    },
    prepare(selection) {
      const { text } = selection;

      return {
        title: "Button",
        subtitle: text
      };
    }
  }
};

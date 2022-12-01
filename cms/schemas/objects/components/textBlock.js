import MDTextFields from "react-icons/lib/md/text-fields";

export default {
  name: "textBlock",
  type: "document",
  title: "Text Block",
  icon: MDTextFields,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      required: true
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }]
    },
    // {
    //   name: "textColour",
    //   title: "Text Colour",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Black", value: "black" },
    //       { title: "White", value: "white" },
    //       { title: "Primary", value: "primary-color" },
    //       { title: "Secondary", value: "secondary-color" }
    //     ]
    //   },
    //   required: true
    // },
    // {
    //   name: "backgroundColour",
    //   title: "Background Colour",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Black", value: "black" },
    //       { title: "White", value: "white" },
    //       { title: "Primary", value: "primary-color" },
    //       { title: "Secondary", value: "secondary-color" }
    //     ]
    //   },
    //   required: true
    // },
    {
      name: "textAlign",
      title: "Text Align",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" }
        ]
      },
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
      title: "title"
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title: "Text Block",
        subtitle: title
      };
    }
  }
};

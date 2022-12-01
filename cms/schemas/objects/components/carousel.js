import MDTextFields from "react-icons/lib/md/text-fields";

export default {
  name: "carousel",
  type: "document",
  title: "Carousel",
  icon: MDTextFields,
  fields: [
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          name: "announcementFields",
          title: "Announcement Fields",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
              required: true
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }]
            }
          ]
        }
      ]
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
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title: "Carousel",
        subtitle: title
      };
    }
  }
};

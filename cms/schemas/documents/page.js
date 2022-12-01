export default {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Title of page. For example: Home",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      description: "The unique URL for this item. For example: about-us",
      type: "slug",
      options: {
        source: (doc, i) => i.parent.title,
        maxLength: 96,
      },
      required: true,
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your page for search engines and social media.",
      validation: (Rule) => Rule.required().max(160),
    },
    {
      title: "Child Pages",
      name: "childPages",
      type: "array",
      of: [
        {
          type: "page",
        },
      ],
    },
    {
      name: "components",
      title: "Components",
      type: "array",
      of: [
        {
          title: "Hero",
          type: "hero",
        },
        {
          title: "Text Block",
          type: "textBlock",
        },
        {
          title: "Text Image Block",
          type: "textImageBlock",
        },
        {
          title: "Carousel",
          type: "carousel",
        },
        {
          title: "Button",
          type: "button",
        },
        {
          title: "Custom Component",
          type: "customComponent",
        },
      ],
    },
  ],
};

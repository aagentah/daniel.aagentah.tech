export default {
  name: "smartLink",
  title: "Smart Link",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [
        {
          title: "Item",
          type: "smartLinkItem",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};

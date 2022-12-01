export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "logo",
      type: "image",
      title: "Logo",
      validation: Rule => Rule.required()
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required().max(60)
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your website for search engines and social media.",
      validation: Rule => Rule.required().max(160)
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Add keywords that describes your portfolio.",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      validation: Rule => Rule.required()
    },
    {
      title: "Menu",
      name: "menu",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }]
        }
      ]
    }
  ],
  initialValue: {
    title: "xxx",
    description: "xxx"
  }
};

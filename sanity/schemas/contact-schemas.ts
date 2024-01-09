const contactInfos = {
    name: "infos",
    title: "Infos",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Titre",
        type: "string",
      },
      {
        name: "mailArchi",
        title: "Mail Archi",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "mailPhoto",
        title: "Mail Photo",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "insta",
        title: "Insta",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "bio",
        title: "Bio",
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: "mentions",
        title: "Mentions Légales",
        type: "array",
        of: [{ type: "block" }],
      },
    ],
  };

  export default contactInfos;
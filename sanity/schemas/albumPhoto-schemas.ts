const photoAlbum = {
  name: "album",
  title: "Photographie",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "family",
      title: "Family",
      type: "string",
      options: {
        list: [
          { title: "Commande", value: "commissioned" },
          { title: "Personnel", value: "personal" },
        ],
      },
    },
    {
      name: "images",
      title: "Slider 1",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt",
                  type: "string",
                },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule: { custom: (arg0: (images: string) => true | "Slider 1 is required") => any; }) =>
      Rule.custom((images: string ) => {
        return images && images.length > 0
          ? true
          : 'Slider 1 is required';
      }),
      },
    
    {
      name: "content",
      title: "Description de l'album",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
  
  export default photoAlbum;
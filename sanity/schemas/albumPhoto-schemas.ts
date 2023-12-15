const photoAlbum = {
  name: "album",
  title: "Photographie",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" }
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
    },
    {
      name: "images2",
      title: "Slider 2",
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
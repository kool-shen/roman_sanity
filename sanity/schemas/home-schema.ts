const homepage = {
    name: "home",
    title: "Homepage",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
          },
      {
        name: "images",
        title: "Images",
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
        validation: (Rule: { custom: (arg0: (images: string) => true | "Slider is required") => any; }) =>
        Rule.custom((images: string ) => {
          return images && images.length > 0
            ? true
            : 'Slider is required';
        }),
      },

      
    
    ],
    
  };
    
    export default homepage;
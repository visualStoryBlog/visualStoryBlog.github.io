const { builder } = require('ideogram-wrapper')
const fs = require('fs')
const path = require('path')

exports.handler = async (event, context) => {
   const prompt = JSON.parse(event.body).prompt

   const outputDir = '/tmp/' // Use tmp folder for Lambda functions
   const image_path = await builder(prompt, {
       output_dir: outputDir,
   })

   const imageBuffer = fs.readFileSync(image_path)
   const base64Image = imageBuffer.toString('base64')

   return {
       statusCode: 200,
       body: JSON.stringify({
           imageUrl: `data:image/png;base64,${base64Image}`
       }),
   };
}


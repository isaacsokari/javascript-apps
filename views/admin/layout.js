module.exports = ({ content, title }) => {
  const pageTitle = title || 'ECommerce App';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
  `;
};

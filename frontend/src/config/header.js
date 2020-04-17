import React from 'react';
import { Helmet } from 'react-helmet';

export default function HelmetHeader() {
  return (
    <Helmet>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
      </style>
    </Helmet>
  );
}

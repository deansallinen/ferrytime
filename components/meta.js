import Head from 'next/head'
export default () => (
    <div>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      body { 
        background: #fefefe;
        color: #222;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
    `}</style>
    </div>
)
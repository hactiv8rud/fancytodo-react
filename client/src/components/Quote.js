import React from 'react';
import axios from '../config/axiosinstance.js';

function Quote() {
  const [data, setData] = React.useState({});
  function getQuote() {
    axios
      .get('/quotes', { headers: { access_token: localStorage.getItem('access_token') } })
      .then(({ data }) => {
        const quoteText = data.data[0].quoteText;
        const quoteAuthor = data.data[0].quoteAuthor;
        const quoteData = { quoteText, quoteAuthor }
        setData(quoteData);
      })
      .catch((err) => {
        console.log(err)
    })
  }
  
  React.useEffect(() => getQuote(), [])

  return(
    <>
      <div className="quote-widget-container col custom-border" style={{paddingLeft: 0, paddingRight: 0, height: "30rem"}}>
        <div className="quote-container" style={{width: "100%", height: "100%", padding: "1rem"}}>
          <div id="welcome-title">Quote Garden</div>
          <div className="quote-content mt-4 custom-border">
            <p id="quote-text">{data.quoteText}</p>
          </div>
          <p className="mt-2" id="quote-author">{data.quoteAuthor}</p>
          <button type="button" onClick={getQuote} className="btn mt-3" id="get-quote" style={{backgroundColor: "#b3b3b3", fontWeight: 500, width: "100%"}}>Get Another Quote</button>
        </div>
      </div>
    </>
  );
}

export default Quote;

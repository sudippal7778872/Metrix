const api = {
  getBallotData() {
    return fetch('http://localhost:8080/api/getBallotData').then(res => {
      return res.json();
    });
  }
};

export default api;
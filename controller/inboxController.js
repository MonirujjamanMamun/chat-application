const getInbox = (req, res) => {
  res.render('inbox', {
    title: 'Inbox page',
  });
};

module.exports = {
  getInbox,
};

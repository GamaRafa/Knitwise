module.exports = function (api) {
  api.cache(true);
  return {
    presents: ['babel-preset-expo'],
    plugins: [['inline-import', { extensions: ['.sql'] }]]
  };
};
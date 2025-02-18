export default {
  getSignupRoute: () => '/api/v1/signup',
  getLoginRoute: () => '/api/v1/login',
  getChannelRoute: (id) => (id ? `/api/v1/channels/${id}` : '/api/v1/channels'),
  getMessageRoute: (id) => (id ? `/api/v1/messages/${id}` : '/api/v1/messages'),
};

const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  signToken: function ({ first_name, last_name, isAdmin, role, email, _id }) {
    const payload = { first_name, last_name, isAdmin, role, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token');
    }

    return req;
  },
  // authorizationError: function() {
  //     return new AuthenticationError('You need to be logged in!');
  // },
  AuthenticationError: function () {
    return new GraphQLError('Could not authenticate user', {
      message: 'Could not authenticate user',
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  },
};

import _ from 'lodash/fp'
import MessageList from './MessageList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ChannelMessagesQuery = gql`
  query CurrentChannelMessages($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        content
        createdAt
        user {
          id
          avatarURL
          username
        }
      }
    }
  }
`

export default graphql(ChannelMessagesQuery, {
  skip: ({ channelId }) => !channelId,
  options: ({ channelId }) => ({
    variables: { channelId },
  }),
  props: ({ data }) => ({
    messages: _.get('channel.messages', data),
  }),
})(MessageList)

import { CuratedMessage } from './types';

export const MOCK_CONVERSATION: CuratedMessage[] = [
  {
    id: '1',
    role: 'user',
    contents: [
      {
        type: 'text',
        text: 'I want to create a new content type for my blog posts',
      },
    ],
  },
  {
    id: '2',
    role: 'assistant',
    status: 'success',
    contents: [
      {
        type: 'text',
        text: "I'll help you create a content type for blog posts. Let me break this down into steps:",
      },
      {
        type: 'marker',
        title: 'Creating Blog Post Content Type',
        state: 'success',
        steps: [
          {
            id: 'step1',
            description: 'Create a new content type named "Blog Post"',
          },
          {
            id: 'step2',
            description: 'Add title field (type: string, required: true)',
          },
          {
            id: 'step3',
            description: 'Add content field (type: rich text, required: true)',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    role: 'user',
    contents: [
      {
        type: 'text',
        text: 'Could you also add fields for author and publication date?',
      },
    ],
  },
  {
    id: '4',
    role: 'assistant',
    status: 'success',
    contents: [
      {
        type: 'text',
        text: "I'll add those fields to the blog post content type.",
      },
      {
        type: 'marker',
        title: 'Adding Author and Date Fields',
        state: 'loading',
        steps: [
          {
            id: 'step1',
            description: 'Add author field (type: relation, target: User)',
          },
          {
            id: 'step2',
            description: 'Add publication date field (type: datetime)',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    role: 'assistant',
    status: 'success',
    contents: [
      {
        type: 'marker',
        title: 'Fields Added Successfully',
        state: 'success',
        steps: [
          {
            id: 'step1',
            description: 'Author field added with User relation',
          },
          {
            id: 'step2',
            description: 'Publication date field added with datetime type',
          },
        ],
      },
      {
        type: 'text',
        text: 'All fields have been added successfully. Your blog post content type now has: title, content, author, and publication date fields. Would you like to add any other fields?',
      },
    ],
  },
];

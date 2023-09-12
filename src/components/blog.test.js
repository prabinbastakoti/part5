import React from 'react';
import '@testing-library/jest-dom';
import { queryByText, render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('Blog posts', () => {
  let container;
  beforeEach(() => {
    const blog = {
      title: 'this is title',
      author: 'this is author',
      url: 'this is url',
      likes: 0,
      user: {
        username: 'test',
        name: 'test',
        id: 'agsfh3823892kjsdfsedf',
      },
      id: 'kjfabsiufy387y782g3iu23',
    };
    container = render(<Blog blog={blog} />).container;
  });
  test('renders content', () => {
    const element = screen.queryByText('this is title this is author');
    expect(element).toBeDefined();
  });

  test('url and likes doesnot show by default', () => {
    const element = container.querySelector('.showWhenVisible');
    expect(element).toHaveStyle({ display: 'none' });
  });
});

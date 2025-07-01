import { renderWithRouter } from '@/__tests__/utils';
import ContentBlock from '@/contents/LandingContent/ContentBlock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ContentBlock', () => {
  it('displays the title and the descriptions', () => {
    render(
      <ContentBlock
        title="Titre test"
        descriptions={['Description 1', 'Description 2']}
      />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Titre test' })
    ).toBeDefined();
    expect(screen.getByText('Description 1')).toBeDefined();
    expect(screen.getByText('Description 2')).toBeDefined();
  });

  it('displays an image if imageSrc is provided', () => {
    render(
      <ContentBlock
        title="Titre"
        descriptions={['Desc']}
        imageSrc="/test.png"
        imageAlt="alt test"
      />
    );
    expect(screen.getByRole('img', { name: 'alt test' })).toBeDefined();
  });
});

it('displays the image on the left if imageLeft is true', () => {
  render(
    <ContentBlock
      title="Titre"
      descriptions={['Desc']}
      imageSrc="/test.png"
      imageAlt="alt test"
      imageLeft={true}
    />
  );
  expect(screen.getByRole('img', { name: 'alt test' })).toBeDefined();
  expect(screen.getByTestId('divContentBlock')).toHaveClass(
    'md:flex-row-reverse'
  );
});

it('displays the link if linkHref is provided', () => {
  renderWithRouter(
    <ContentBlock
      title="Titre"
      descriptions={['Desc']}
      hrefLink="/test"
      linkText="Link"
    />
  );
  expect(screen.getByRole('link', { name: 'Link' })).toBeDefined();
});

it('displays an empty alt text if imageAlt is not provided', () => {
  render(
    <ContentBlock title="Titre" descriptions={['Desc']} imageSrc="/test.png" />
  );
  expect(screen.getByTestId('imgContentBlock')).toHaveAttribute('alt', '');
});

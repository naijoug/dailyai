// A digest category and catalog date are not evidence of a launch date.
// Only the explicitly linked subject gets the product-introduction badge;
// name/domain matches remain useful related mentions, never implied launches.
export function mentionKind(section: string, explicit: boolean, postType: string): 'discovery' | 'x' | 'news' {
  if (explicit && /^(新产品|New Products)$/i.test(section.trim())) return 'discovery';
  return postType === 'x-ai' ? 'x' : 'news';
}

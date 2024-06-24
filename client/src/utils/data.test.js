const { jobTypes, experience, popularSearch, jobs, footerLinks, companies } = require('./jobPortal');

describe('Job Portal Data Structures', () => {
  it('should have defined job types', () => {
    expect(jobTypes).toBeDefined();
    expect(jobTypes).toContain('Full-Time');
    // Add more specific tests as needed
  });

  it('should have defined experience levels', () => {
    expect(experience).toBeDefined();
    expect(experience).toContain('Entry Level');
    // Add more specific tests as needed
  });

  it('should have defined popular search keywords', () => {
    expect(popularSearch).toBeDefined();
    expect(popularSearch).toContain('Software Engineer');
    // Add more specific tests as needed
  });

  it('should have at least one job listing', () => {
    expect(jobs.length).toBeGreaterThan(0);
    // Add more specific tests for job listings as needed
  });

  it('should have defined footer links', () => {
    expect(footerLinks).toBeDefined();
    expect(footerLinks).toContain('Privacy Policy');
    // Add more specific tests for footer links as needed
  });

  it('should have at least one company listed', () => {
    expect(companies.length).toBeGreaterThan(0);
    // Add more specific tests for companies as needed
  });
});

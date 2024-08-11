export const headers = () => ({
  get: (key: string) => {
    switch (key) {
      case 'search':
        return 'pikachu';
      case 'page':
        return '1';
      case 'checked':
        return '[]';
      case 'theme':
        return 'dark';
      default:
        return null;
    }
  }
});
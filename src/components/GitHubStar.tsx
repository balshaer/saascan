import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GitHubStar = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/your-username/saascan');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
      }
    };

    fetchStars();
  }, []);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        window.open('https://github.com/your-username/saascan', '_blank', 'noopener noreferrer')
      }
      className="flex items-center gap-2"
      aria-label="Star on GitHub"
    >
      <Star className="w-4 h-4" />
      Star on GitHub
      {stars !== null && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{stars}</span>}
    </Button>
  );
};

export default GitHubStar;

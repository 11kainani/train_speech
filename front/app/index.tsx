// app/index.tsx
import { useEffect } from 'react';
import { router, useRootNavigationState, useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const rootNavigation = useRootNavigationState();
  useEffect(() => {
    if (rootNavigation?.key) {
      router.replace('/(tabs)/home'); 

    }
  }, [rootNavigation]);

  return null; 
}
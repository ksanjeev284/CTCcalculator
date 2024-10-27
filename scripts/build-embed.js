import { build } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function buildEmbed() {
  // Build the React app
  await build({
    configFile: false,
    root: '.',
    build: {
      target: 'es2015',
      outDir: 'dist-embed',
      rollupOptions: {
        input: 'src/main.tsx',
        output: {
          format: 'iife',
          name: 'CTCCalculator',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'lucide-react': 'LucideReact'
          }
        },
        external: ['react', 'react-dom', 'lucide-react']
      }
    }
  });

  // Read the built JS
  const builtJs = readFileSync(join('dist-embed', 'assets', 'index.js'), 'utf-8');
  
  // Read the embed template
  let embedHtml = readFileSync(join('public', 'embed.html'), 'utf-8');
  
  // Inject the built JS
  embedHtml = embedHtml.replace(
    '<script>\n        // Your compiled React app will be injected here during build\n    </script>',
    `<script>${builtJs}</script>`
  );

  // Write the final embed file
  writeFileSync(join('dist-embed', 'embed.html'), embedHtml);
}

buildEmbed().catch(console.error);
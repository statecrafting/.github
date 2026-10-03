import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { Catalog } from '../app/lib/catalog';
const catalog = JSON.parse(readFileSync('public/data/catalog.json','utf8')) as Catalog;
const source=catalog.sources.find(s=>s.repository==='statecrafting/spec-spine')!;
const spec=source.specs.find(s=>s.anchors.length>0)!;
test('landing has no external runtime requests or hydration failures',async({page})=>{
 const external:string[]=[];const errors:string[]=[];
 page.on('request',r=>{if(new URL(r.url()).origin!=='http://127.0.0.1:4173')external.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{name:'Make intent a working contract.'})).toBeVisible();
 await page.getByRole('button',{name:'02 Authority Inspect'}).click();await expect(page.getByText('spec-spine compiles declared relationships')).toBeVisible();
 expect(external).toEqual([]);expect(errors).toEqual([]);
});
test('catalog search, empty state and lifecycle filtering work',async({page})=>{
 await page.goto('/registry');await page.getByRole('searchbox').fill('no-such-specification-zzzz');await expect(page.getByRole('heading',{name:'No specifications match.'})).toBeVisible();
 await page.getByRole('button',{name:'Clear filters'}).click();await page.getByRole('searchbox').fill('statecraft-cli');await expect(page.getByRole('status')).toContainText('3 repositories');
 await page.getByLabel('Declared lifecycle').selectOption('draft');const badges=page.locator('.status').filter({hasText:'Lifecycle'});for(const badge of await badges.all())await expect(badge).toContainText('draft');
});
test('detail deep link preserves provenance, anchors and distinct states',async({page})=>{
 await page.goto(`/registry/spec-spine/${spec.id}`);await expect(page.getByRole('heading',{name:spec.title,exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Read the full pinned specification'})).toHaveAttribute('href',spec.sourceUrl);
 await expect(page.getByText(source.revision,{exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Frozen anchors'})).toBeVisible();
 await expect(page.locator('.statuses')).toContainText('Verification unknown');await expect(page.locator('.statuses')).toContainText('Qualification unknown');
 await page.reload();await expect(page.getByRole('heading',{name:spec.title,exact:true})).toBeVisible();
});
test('unknown spec and route do not show substitute content',async({page})=>{
 await page.goto('/registry/spec-spine/999-does-not-exist');await expect(page.getByRole('heading',{name:'This page is not in the catalog.'})).toBeVisible();await expect(page.getByText('No substitute specification is shown.')).toBeVisible();
 await page.goto('/does-not-exist');await expect(page.getByRole('heading',{name:'This page is not in the public catalog.'})).toBeVisible();
});
test('mobile navigation, keyboard focus and theme persist',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.getByRole('button',{name:'Menu +'}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menu +'})).toBeFocused();
 await page.getByRole('button',{name:'Menu +'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Papers'}).click();await expect(page.getByRole('heading',{name:'The reasoning behind the tools.'})).toBeVisible();
 await page.getByLabel('Color theme').selectOption('dark');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.getByLabel('Color theme').selectOption('light');await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('paper TOC, references, print layout and narrow detail layout remain readable',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/papers/governed-work');await expect(page.getByRole('navigation',{name:'Table of contents'})).toBeVisible();
 await page.getByRole('link',{name:'04. Evidence supports a bounded conclusion'}).click();await expect(page).toHaveURL(/#evidence$/);await expect(page.getByRole('heading',{name:'Public source references'})).toBeVisible();
 await page.emulateMedia({media:'print'});await expect(page.locator('.site-header')).toBeHidden();await expect(page.getByRole('heading',{name:'Intent, authority, evidence',exact:true})).toBeVisible();
 await page.emulateMedia({media:'screen'});await page.goto(`/registry/spec-spine/${spec.id}`);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});

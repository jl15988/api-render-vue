import{_ as e,c as t,o as a,a2 as i}from"./chunks/framework.BSB0Uh0P.js";const f=JSON.parse('{"title":"Function: defineApiTemplates()","description":"","frontmatter":{},"headers":[],"relativePath":"api/functions/defineApiTemplates.md","filePath":"api/functions/defineApiTemplates.md"}'),s={name:"api/functions/defineApiTemplates.md"},d=i('<p><a href="./../globals.html">api-render-vue</a> / defineApiTemplates</p><h1 id="function-defineapitemplates" tabindex="-1">Function: defineApiTemplates() <a class="header-anchor" href="#function-defineapitemplates" aria-label="Permalink to &quot;Function: defineApiTemplates()&quot;">​</a></h1><h2 id="defineapitemplates-id-templates" tabindex="-1">defineApiTemplates(id, templates) <a class="header-anchor" href="#defineapitemplates-id-templates" aria-label="Permalink to &quot;defineApiTemplates(id, templates)&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineApiTemplates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">D</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">templates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DefineApiRenderTemplateType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>定义统一模板</p><h3 id="type-parameters" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type Parameter</th></tr></thead><tbody><tr><td><code>D</code> <em>extends</em> <code>string</code></td></tr><tr><td><code>T</code> <em>extends</em> <code>unknown</code></td></tr></tbody></table><h3 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>id</code></td><td><code>D</code></td><td>分包 ID</td></tr><tr><td><code>templates</code></td><td><code>T</code></td><td>模板项</td></tr></tbody></table><h3 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p><code>DefineApiRenderTemplateType</code>&lt;<code>T</code>&gt;</p><h3 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h3><p><a href="https://github.com/jl15988/api-render-vue/blob/df6f63d8a60e76319865d02476770ebcc367cddb/src/ApiRenderTemplate.ts#L44" target="_blank" rel="noreferrer">src/ApiRenderTemplate.ts:44</a></p><h2 id="defineapitemplates-templates" tabindex="-1">defineApiTemplates(templates) <a class="header-anchor" href="#defineapitemplates-templates" aria-label="Permalink to &quot;defineApiTemplates(templates)&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineApiTemplates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">templates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DefineApiRenderTemplateType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>定义统一模板</p><h3 id="type-parameters-1" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters-1" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type Parameter</th></tr></thead><tbody><tr><td><code>T</code> <em>extends</em> <code>unknown</code></td></tr></tbody></table><h3 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>templates</code></td><td><code>T</code></td><td>模板项</td></tr></tbody></table><h3 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p><code>DefineApiRenderTemplateType</code>&lt;<code>T</code>&gt;</p><h3 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h3><p><a href="https://github.com/jl15988/api-render-vue/blob/df6f63d8a60e76319865d02476770ebcc367cddb/src/ApiRenderTemplate.ts#L49" target="_blank" rel="noreferrer">src/ApiRenderTemplate.ts:49</a></p>',24),n=[d];function r(p,l,h,o,c,k){return a(),t("div",null,n)}const b=e(s,[["render",r]]);export{f as __pageData,b as default};

import{_ as e,c as a,o as t,a2 as i}from"./chunks/framework.BSB0Uh0P.js";const _=JSON.parse('{"title":"Function: setApiRenderCache()","description":"","frontmatter":{},"headers":[],"relativePath":"api/functions/setApiRenderCache.md","filePath":"api/functions/setApiRenderCache.md"}'),s={name:"api/functions/setApiRenderCache.md"},n=i(`<p><a href="./../globals.html">api-render-vue</a> / setApiRenderCache</p><h1 id="function-setapirendercache" tabindex="-1">Function: setApiRenderCache() <a class="header-anchor" href="#function-setapirendercache" aria-label="Permalink to &quot;Function: setApiRenderCache()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setApiRenderCache</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   api</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> void</span></span></code></pre></div><p>赋值缓存</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>value</code></td><td><code>any</code></td><td>缓存的值</td></tr><tr><td><code>api</code>?</td><td><code>ApiRenderApiType</code></td><td>api 请求函数，也用于缓存重载</td></tr><tr><td><code>key</code>?</td><td><code>string</code> | <code>number</code></td><td>api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段</td></tr></tbody></table><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>void</code></p><h2 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h2><p><a href="https://github.com/jl15988/api-render-vue/blob/df6f63d8a60e76319865d02476770ebcc367cddb/src/ApiRenderCache.ts#L98" target="_blank" rel="noreferrer">src/ApiRenderCache.ts:98</a></p>`,10),d=[n];function r(h,p,c,o,l,k){return t(),a("div",null,d)}const f=e(s,[["render",r]]);export{_ as __pageData,f as default};

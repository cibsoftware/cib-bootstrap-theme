/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { describe, it, expect } from 'vitest';
import formatter from '../scripts/junit-formatter.mjs';

describe('junit-formatter', () => {
  it('emits a zero-failure suite with a passing placeholder testcase when there are no results', () => {
    const xml = formatter([]);

    expect(xml).toContain('<testsuite name="stylelint" tests="0" failures="0">');
    expect(xml).toContain('<testcase classname="stylelint" name="No lint errors"/>');
    expect(xml).not.toContain('<failure');
  });

  it('emits a zero-failure suite when results have no warnings', () => {
    const xml = formatter([{ source: 'src/scss/_colors.scss', warnings: [] }]);

    expect(xml).toContain('<testsuite name="stylelint" tests="0" failures="0">');
    expect(xml).toContain('<testcase classname="stylelint" name="No lint errors"/>');
  });

  it('emits one testcase/failure per warning across all results', () => {
    const results = [
      {
        source: 'src/scss/_colors.scss',
        warnings: [
          { rule: 'color-hex-length', text: 'Expected "#ffffff" to be "#fff"', line: 18, column: 9 },
        ],
      },
      {
        source: 'src/scss/_utilities.scss',
        warnings: [
          { rule: 'length-zero-no-unit', text: 'Disallowed unit', line: 60, column: 20 },
          { rule: 'no-descending-specificity', text: 'Expected selector order', line: 12, column: 1 },
        ],
      },
    ];

    const xml = formatter(results);

    expect(xml).toContain('<testsuite name="stylelint" tests="3" failures="3">');
    expect(xml).not.toContain('No lint errors');

    expect(xml).toContain('<testcase classname="src/scss/_colors.scss" name="color-hex-length">');
    expect(xml).toContain('<failure message="Expected &quot;#ffffff&quot; to be &quot;#fff&quot;">src/scss/_colors.scss:18:9</failure>');

    expect(xml).toContain('<testcase classname="src/scss/_utilities.scss" name="length-zero-no-unit">');
    expect(xml).toContain('<failure message="Disallowed unit">src/scss/_utilities.scss:60:20</failure>');

    expect(xml).toContain('<testcase classname="src/scss/_utilities.scss" name="no-descending-specificity">');
    expect(xml).toContain('<failure message="Expected selector order">src/scss/_utilities.scss:12:1</failure>');
  });

  it('escapes XML-special characters in source, rule, and message text', () => {
    const results = [
      {
        source: 'src/scss/<weird>&"file".scss',
        warnings: [
          { rule: "rule<>&'\"", text: `Value <"bad"> & 'ugly'`, line: 1, column: 2 },
        ],
      },
    ];

    const xml = formatter(results);

    expect(xml).toContain('classname="src/scss/&lt;weird&gt;&amp;&quot;file&quot;.scss"');
    expect(xml).toContain('name="rule&lt;&gt;&amp;&apos;&quot;"');
    expect(xml).toContain('message="Value &lt;&quot;bad&quot;&gt; &amp; &apos;ugly&apos;"');
    expect(xml).toContain('>src/scss/&lt;weird&gt;&amp;&quot;file&quot;.scss:1:2</failure>');
  });

  it('produces well-formed XML with the declaration and matching root tags', () => {
    const xml = formatter([]);

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true);
    expect(xml.trim().endsWith('</testsuite>')).toBe(true);
  });
});

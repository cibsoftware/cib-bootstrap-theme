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

function escape(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default function formatter(results) {
  const failures = results.reduce(
    (count, result) => count + result.warnings.length,
    0
  );

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<testsuite name="stylelint" tests="${failures}" failures="${failures}">\n`;

  for (const result of results) {
    for (const warning of result.warnings) {
      xml += `  <testcase classname="${escape(result.source)}" name="${escape(
        warning.rule
      )}">\n`;
      xml += `    <failure message="${escape(warning.text)}">`;
      xml += `${escape(result.source)}:${warning.line}:${warning.column}`;
      xml += `</failure>\n`;
      xml += `  </testcase>\n`;
    }
  }

  // If there are no warnings, emit one passing test so Jenkins
  // doesn't consider the report empty.
  if (failures === 0) {
    xml += `  <testcase classname="stylelint" name="No lint errors"/>\n`;
  }

  xml += `</testsuite>\n`;

  return xml;
}

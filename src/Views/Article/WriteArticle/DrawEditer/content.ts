/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
// tslint:disable:max-line-length
import { EditableType } from '@react-page/core/lib/types/editable';

const contents: EditableType[] = [
  {
    id: '1',
    cells: [
      {
        id: '5ac89ec4-7536-4120-a072-8eedad0a48ff',
        inline: null,
        size: 12,
        rows: [
          {
            id: 'd813d094-215a-43ec-bcdd-d5fd6258b915',
            cells: [
              {
                id: '3fde7b92-fbfe-4b2d-85b3-bad431939df6',
                inline: null,
                size: 12,
                content: {
                  plugin: {
                    name: 'ory/editor/core/content/slate',
                    version: '0.0.2',
                  },
                  state: {
                    serialized: {
                      object: 'value',
                      document: {
                        object: 'document',
                        data: {},
                        nodes: [
                          {
                            object: 'block',
                            type: 'HEADINGS/HEADING-ONE',
                            isVoid: false,
                            data: {
                              align: 'left',
                            },
                            nodes: [
                              {
                                object: 'text',
                                leaves: [
                                  {
                                    object: 'leaf',
                                    text: '',
                                    marks: [],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            object: 'block',
                            type: 'PARAGRAPH/PARAGRAPH',
                            isVoid: false,
                            data: {
                              align: 'left',
                            },
                            nodes: [
                            ],
                          },
                          {
                            object: 'block',
                            type: 'PARAGRAPH/PARAGRAPH',
                            isVoid: false,
                            data: {
                              align: 'left',
                            },
                            nodes: [
                              {
                                object: 'text',
                                leaves: [
                                  {
                                    object: 'leaf',
                                    text:
                                      '',
                                    marks: [],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          }
        ],
      },
    ],
  },
  {
    id: '2',
    cells: [
      {
        rows: [
          {
            cells: [
              {
                content: {
                  plugin: {
                    name: 'ory/editor/core/content/slate',
                    version: '0.0.2',
                  },
                  state: {},
                },
                id: '7d29c96e-53b8-4b3e-b0f1-758b405d6daf',
              },
            ],
            id: 'd62fe894-5795-4f00-80c8-0a5c9cfe85b9',
          },
          {
            cells: [
              {
                rows: [
                  {
                    cells: [
                      {
                        inline: 'right',
                        content: {
                          plugin: {
                            name: 'ory/editor/core/content/image',
                            version: '0.0.1',
                          },
                          state: {
                            src: '/images/grass-header.jpg',
                          },
                        },
                        id: 'c3fab3ee-c086-4faf-8a88-e8f321d425c2',
                      },
                      {
                        content: {
                          plugin: {
                            name: 'ory/editor/core/content/slate',
                            version: '0.0.2',
                          },
                          state: {
                            importFromHtml:
                              '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>',
                          },
                        },
                        id: '254233b6-4bf3-4d0a-8c86-ab7b88f4283c',
                      },
                    ],
                    id: 'f32b324e-2d17-4658-8941-93c7380d51d8',
                  },
                  {
                    cells: [
                      {
                        content: {
                          plugin: {
                            name: 'ory/editor/core/content/slate',
                            version: '0.0.2',
                          },
                          state: {
                            importFromHtml:
                              '<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>',
                          },
                        },
                        id: 'c5d411d5-595c-4ff2-ac11-0d0079a814ef',
                      },
                    ],
                    id: '25d9f081-28b6-45f0-bff0-5a11bc5db071',
                  },
                  {
                    cells: [
                      {
                        content: {
                          plugin: {
                            name: 'ory/editor/core/content/slate',
                            version: '0.0.2',
                          },
                          state: {
                            importFromHtml:
                              '<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>',
                          },
                        },
                        id: '42cd103b-9b14-4674-a895-50c629183a00',
                      },
                    ],
                    id: 'c969431c-aa25-4b81-a5e5-752751517309',
                  },
                  {
                    cells: [
                      {
                        content: {
                          plugin: {
                            name: 'ory/editor/core/content/slate',
                            version: '0.0.2',
                          },
                          state: {
                            importFromHtml:
                              '<p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>',
                          },
                        },
                        id: '15ab9e7d-70e2-4a6b-9f99-3a849a31ac59',
                      },
                    ],
                    id: '83c94e3c-2fd5-4e2a-8384-4f31841dab27',
                  },
                ],
                id: '9a7d26ec-ead5-429f-a596-b53935642f4b',
              },
            ],
            id: '8c16dbe4-96e3-41fd-8012-6c37233d86f6',
          },
        ],
        id: '15efd3c3-b683-4da6-b107-16d8d0c8cd26',
      },
    ],
  },
];
export default contents;
/**
 * cli-component.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module cli-component.ts
 */
export default interface CliComponent {
  render: () => Promise<string>;
}

/**
 * cli-component.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module cli-component.ts
 */
export default interface CliComponent {
  render: () => Promise<string>;
}

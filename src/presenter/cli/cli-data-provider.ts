/**
 * cli-data-provider.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module cli-data-provider.ts
 */
export default interface CliDataProvider<D = any> {
  getData: () => Promise<D>;
}

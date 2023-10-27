import { TransactionEventTag, TransactionSummaryType } from "@concordium/node-sdk";
import { ConcordiumDatasourceKind, ConcordiumHandlerKind, ConcordiumProject } from "@subql/types-concordium"

const project: ConcordiumProject = {
    specVersion: "1.0.0",
    name: "soroban-subql-starter",
    version: "0.0.1",
    runner: {
      node: {
        name: "@subql/node-concordium",
        version: "*"
      },
      query: {
        name: "@subql/query",
        version: "*"
      }
    },
    description: "This project can be use as a starting point for developing your new Concordium Soroban Future Network SubQuery project",
    repository: "https://github.com/subquery/concordium-subql-starter",
    schema: {
      file: "./schema.graphql"
    },
    network: {
      chainId: "4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796",
      endpoint: ["node.testnet.concordium.com:20000"]
    },
    dataSources: [
      {
        kind: ConcordiumDatasourceKind.Runtime,
        startBlock: 490000,
        mapping: {
          file: "./dist/index.js",
          handlers: [
            {
              handler: "handleTransaction",
              kind: ConcordiumHandlerKind.Transaction,
              filter: {
                type: TransactionSummaryType.AccountTransaction,
                values: {
                  transactionType: 'transfer'
                }
              }
            },
            {
              handler: "handleTransactionEvent",
              kind: ConcordiumHandlerKind.TransactionEvent,
              filter: {
                type: TransactionEventTag.Updated
              }
            },
            {
              handler: "handleSpecialEvent",
              kind: ConcordiumHandlerKind.SpecialEvent,
              filter: {
                type: 'blockAccrueReward'
              }
            }
          ]
        }
      }
    ]
  };

  export default project;
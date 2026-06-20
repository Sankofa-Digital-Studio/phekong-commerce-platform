# Deployment

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Status: Draft
Owner: Sankofa Digital Lead

## Environments
- Local: contributor machine with test data
- Preview: pull-request or controlled review environment
- Production: approved live release

## Release controls
- Production releases originate from `main`.
- Required checks must pass before release.
- Environment configuration is managed outside source control.
- Every release must have a version, deployment record and rollback note.
